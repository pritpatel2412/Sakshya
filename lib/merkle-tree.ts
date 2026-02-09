
import crypto from 'crypto'

/**
 * Merkle Tree Implementation for Secure Credential Verification
 * A Merkle Tree allows for efficient and secure verification of large datasets.
 * It is a fundamental component of blockchain technology.
 */
export class MerkleTree {
  private leaves: string[]
  private layers: string[][]

  constructor(leaves: string[]) {
    this.leaves = leaves.map((leaf) => this.hash(leaf))
    this.layers = [this.leaves]
    this.buildTree()
  }

  /**
   * Generates a SHA-256 hash of the input data
   */
  private hash(data: string): string {
    return crypto.createHash('sha256').update(data).digest('hex')
  }

  /**
   * Builds the Merkle Tree from the bottom up
   */
  private buildTree() {
    let currentLayer = this.leaves

    while (currentLayer.length > 1) {
      const nextLayer: string[] = []

      for (let i = 0; i < currentLayer.length; i += 2) {
        if (i + 1 < currentLayer.length) {
          // Hash the concatenation of the left and right children
          nextLayer.push(this.hash(currentLayer[i] + currentLayer[i + 1]))
        } else {
          // If there is an odd number of nodes, duplicate the last one
          nextLayer.push(this.hash(currentLayer[i] + currentLayer[i])) // Or just carry it up: this.hash(currentLayer[i]) depending on implementation
        }
      }

      this.layers.push(nextLayer)
      currentLayer = nextLayer
    }
  }

  /**
   * Returns the Merkle Root of the tree
   */
  public getRoot(): string {
    if (this.layers.length === 0) return ''
    return this.layers[this.layers.length - 1][0]
  }

  /**
   * Generates a Merkle Proof for a given leaf
   * The proof consists of the sibling hashes needed to reconstruct the path to the root
   */
  public getProof(leaf: string): string[] {
    const leafHash = this.hash(leaf)
    let index = this.leaves.indexOf(leafHash)

    if (index === -1) return []

    const proof: string[] = []

    for (let i = 0; i < this.layers.length - 1; i++) {
      const layer = this.layers[i]
      const isRightNode = index % 2 === 1
      const siblingIndex = isRightNode ? index - 1 : index + 1

      if (siblingIndex < layer.length) {
        proof.push(layer[siblingIndex])
      } else {
        // If no sibling (odd number of nodes at this level), we might push the node itself or nothing depending on implementation
        // For standard Merkle Trees, we usually duplicate the last node, so the sibling would be itself.
         proof.push(layer[index]) 
      }

      index = Math.floor(index / 2)
    }

    return proof
  }

  /**
   * Verifies a leaf against a Merkle Root using a proof
   */
  public static verify(proof: string[], leaf: string, root: string): boolean {
    let hash = crypto.createHash('sha256').update(leaf).digest('hex')

    for (const proofElement of proof) {
      // We need to know if the proof element is left or right.
      // Standard verification usually requires the position (index) of the leaf or a sorted hash approach.
      // For simplicity in this "complex algo" demo without index tracking:
      // We'll try both concats (hash + proof) and (proof + hash) and see which matches, 
      // OR we adopt the sorted hash approach (OpenZeppelin style): hash(min(a,b) + max(a,b))
      
      const bufferHash = Buffer.from(hash, 'hex')
      const bufferProof = Buffer.from(proofElement, 'hex')
      
      // Sorted pair hash approach (more secure/standard for simple proofs)
      const combined = Buffer.concat(
        Buffer.compare(bufferHash, bufferProof) <= 0
          ? [bufferHash, bufferProof]
          : [bufferProof, bufferHash]
      )
      
      hash = crypto.createHash('sha256').update(combined).digest('hex')
    }

    return hash === root
  }
}
