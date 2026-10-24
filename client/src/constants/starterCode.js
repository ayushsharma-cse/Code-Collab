export const STARTER_CODE = {
  javascript: `// Welcome to CodeCollab Studio ⚡
// Real-time collaborative code editor

function calculateSum(items) {
  return items.reduce((total, item) => total + item.price, 0);
}

const cart = [{ price: 40 }, { price: 60 }];
console.log("Total:", calculateSum(cart));
`,

  typescript: `// Welcome to CodeCollab Studio ⚡
interface Item {
  price: number;
}

function calculateSum(items: Item[]): number {
  return items.reduce((total, item) => total + item.price, 0);
}

const cart: Item[] = [{ price: 40 }, { price: 60 }];
console.log("Total:", calculateSum(cart));
`,

  python: `# Welcome to CodeCollab Studio ⚡
def calculate_sum(items):
    return sum(item['price'] for item in items)

cart = [{'price': 40}, {'price': 60}]
print("Total:", calculate_sum(cart))
`,

  cpp: `// Welcome to CodeCollab Studio ⚡
#include <iostream>
#include <vector>

int main() {
    std::cout << "Hello from CodeCollab C++!" << std::endl;
    return 0;
}
`,

  java: `// Welcome to CodeCollab Studio ⚡
public class Main {
    public static void main(String[] args) {
        System.out.println("Hello from CodeCollab Java!");
    }
}
`,

  c: `// Welcome to CodeCollab Studio ⚡
#include <stdio.h>

int main() {
    printf("Hello from CodeCollab C!\\n");
    return 0;
}
`,

  go: `// Welcome to CodeCollab Studio ⚡
package main

import "fmt"

func main() {
    fmt.Println("Hello from CodeCollab Go!")
}
`,

  rust: `// Welcome to CodeCollab Studio ⚡
fn main() {
    println!("Hello from CodeCollab Rust!");
}
`,

  php: `<?php
// Welcome to CodeCollab Studio ⚡
echo "Hello from CodeCollab PHP!\\n";
?>
`,

  ruby: `# Welcome to CodeCollab Studio ⚡
puts "Hello from CodeCollab Ruby!"
`,
};
