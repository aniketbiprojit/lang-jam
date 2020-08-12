import { Token } from './Token'
import { TokenType } from './TokenTypes'

export default class Scanner {
	private source: String
	private tokens: Array<Token> = []

	private start: number = 0
	private current: number = 0
	private line: number = 1

	constructor(source: String) {
		this.source = source
	}

	/**
	 * The main function.
	 */
	public scanTokens(): Array<Token> {
		while (!this.isAtEnd()) {
			this.start = this.current
			this.scanToken()
		}
		return this.tokens
	}

	/**
	 * Processes the source line by line, char by char
	 */
	public scanToken() {
		let char = this.advance()
		switch (char) {
			case '(':
				this.addToken(TokenType.LEFT_PAREN)
				break
			case ')':
				this.addToken(TokenType.RIGHT_PAREN)
				break
			case '{':
				this.addToken(TokenType.LEFT_BRACE)
				break
			case '}':
				this.addToken(TokenType.RIGHT_BRACE)
				break
			case ',':
				this.addToken(TokenType.COMMA)
				break
			case '.':
				this.addToken(TokenType.DOT)
				break
			case '-':
				this.addToken(TokenType.MINUS)
				break
			case '+':
				this.addToken(TokenType.PLUS)
				break
			case ';':
				this.addToken(TokenType.SEMICOLON)
				break
			case '*':
				this.addToken(TokenType.STAR)
				break
			default:
				console.log('undefined identifier')
				break
		}
	}

	/**
	 * Mantains the token list.
	 */
	private addToken(type?: TokenType, literal?: any) {
		if (!literal) {
			literal = null
		}
		let text = this.source.substring(this.start, this.current)

		this.tokens.push(new Token({ type: type, lexeme: text, literal: literal, line: this.line }))
	}

	/**
	 * Increments the loop.
	 */
	private advance(): string {
		this.current++
		return this.source[this.current - 1]
	}

	/**
	 * return current > source
	 */
	private isAtEnd() {
		return this.current > this.source.length
	}
}
