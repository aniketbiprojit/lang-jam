import { readFileSync } from 'fs'
import Scanner from './Scanner'
import { Token } from './Token'

/**
 * RunInterface
 * @interface
 */
interface RunInterface {
	/**
	 * Error Flag.
	 */
	HadError: boolean

	/**
	 * Array of tokens.
	 */
	Tokens: Array<Token>

	/**
	 * Main function
	 * @function
	 */
	main(): void
}

/**
 * AbstractRun Class
 * @abstract
 */
abstract class AbstractRun implements RunInterface {
	public HadError: boolean = false
	public Tokens: Array<Token> = []
	main() {}
	protected runFile(file_path: string): void {}
}

/**
 * Run Class
 * @class
 */
export class Run extends AbstractRun {
	constructor() {
		super()
		this.main()
	}
	main() {
		if (process.argv.length == 3) {
			this.runFile(process.argv[2])
		}
	}

	protected runFile(file_path: string) {
		this.run(readFileSync('src/' + file_path).toString())
	}

	private run(data: string): void {
		this.Tokens = new Scanner(data).scanTokens()

		for (const token of this.Tokens) {
			console.log(token)
		}
	}
}

new Run()
