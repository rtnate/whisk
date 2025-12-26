import readline from "readline";
import { unitRepository } from "@rtnate/whisk-units";

// Create repo
const units = unitRepository;

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: "> ",
});

console.log("Whisk Units Debug");
console.log("Type a unit symbol (e.g. 'tsp', 'oz', 'cup') or Ctrl+C to exit.");
rl.prompt();

rl.on("line", (line) => {
  const token = line.trim();

  if (!token) {
    rl.prompt();
    return;
  }

  const matches = units.findBySymbol(token);

  if (matches.length === 0) {
    console.log("No matches");
  } else if (matches.length === 1) {
    console.log("Match:");
    console.log(matches[0]);
  } else {
    console.log(`Ambiguous (${matches.length} matches):`);
    for (const m of matches) {
      console.log(`- ${m.id} (${m.kind})`);
    }
  }

  rl.prompt();
});
