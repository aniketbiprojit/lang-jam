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

	constructor(type: TokenType, lexeme: string, literal: any, line: number) {
		this.type = type
		this.lexeme = lexeme
		this.literal = literal
		this.line = line
	}

	public toString() {
		return this.type + ' ' + this.lexeme + ' ' + this.literal
	}
}
