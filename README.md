# StudyBuddy

StudyBuddy is an interactive CLI application to help you learn faster with spaced repetition.

## Installation

```bash
npm install -global studybuddy
```

## Usage

```bash
studybuddy
```

#### Navigating StudyBuddy
`arrow keys`: cycle through options
`return`: select option
`ctrl-c`: exit program

#### Using the editor:
1. Press `i` to enable "insert mode".
2. Text's format will be saved as inputted.
3. Press `ctrl-c"` to enable editor's command prompt.
4. Type `:wq` + `return` to save and exit.

## Decks
Problems will be retrieved in order from the deck's review queue.

If the review queue is empty, the deck will retrieve any random problem from itself.

## Problems
Problems will be retrieved in random order and will not be sent to a review queue.

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License

[MIT](https://choosealicense.com/licenses/mit/)
