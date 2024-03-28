import yargs from 'yargs'
import { hideBin } from 'yargs/helpers'
import type {CLIParameters} from "../types";

const argv: CLIParameters = yargs(hideBin(process.argv)).argv as unknown as CLIParameters;

console.log(argv)
