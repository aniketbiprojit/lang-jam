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

		this.tokens.push(new Token(TokenType.EOF, '', null, this.line))

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
			case '!':
				this.addToken(this.match('=') ? TokenType.NOT_EQUAL : TokenType.NOT)
				break
			case '=':
				this.addToken(this.match('=') ? TokenType.EQUAL_EQUAL : TokenType.EQUAL)
				break
			case '<':
				this.addToken(this.match('=') ? TokenType.LESS_EQUAL : TokenType.LESS)
				break
			case '>':
				this.addToken(this.match('=') ? TokenType.GREATER_EQUAL : TokenType.GREATER)
				break
			case '\t':
			case '\r':
			case ' ':
				break
			case '\n':
				this.line++
				break
			default:
				this.addToken(TokenType.ERROR, typeof char)
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

		this.tokens.push(new Token(type, text, literal, this.line))
	}

	/**
	 * Increments the loop.
	 */
	private advance(): string {
		this.current++
		return this.source[this.current - 1]
	}

	/**
	 * Check next intermediate character.
	 * If ! is encountered checked for != or !
	 */
	private match(expected: string): boolean {
		if (this.isAtEnd()) {
			return false
		}
		if (this.source[this.current] != expected) return false

		this.current++
		return true
	}

	/**
	 * return current > source
	 */
	private isAtEnd() {
		return this.current > this.source.length - 1
	}
}
