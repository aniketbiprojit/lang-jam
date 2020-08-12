import { TokenType } from './TokenTypes'
/**
 * TokenInterface
 * @interface
 */
interface TokenInterface {
	type: TokenType
	lexeme: string
	literal: any
	line: number
}

export class Token implements TokenInterface {
	public type: TokenType
	public lexeme: string
	public literal: any
	public line: number

	constructor(token: TokenInterface) {
		this.type = token.type
		this.lexeme = token.lexeme
		this.literal = token.literal
		this.line = token.line
	}

	public toString() {
		return this.type + ' ' + this.lexeme + ' ' + this.literal
	}
}
