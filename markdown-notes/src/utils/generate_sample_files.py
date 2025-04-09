import datetime
import os
import random


file_path = '../data/sample_file.txt'

notebook_names = [
    "Personal",
    "Study",
    "Work",
    "Projects",
    "Travel",
    "Health",
    "Finance",
]

folder_names = [
    "fluffy-gargoyle",
    "hairy-outpost",
    "oleander-sage",
    "target-archer",
    "sapphire-forest",
    "emerald-brook",
    "ollyphant",
    "elderberry-grove",
    "apple-tree",
    "blue-bird",
    "cherry-blossom",
    "marmot-peak"
]

file_names = [
    "sylvester.md",
    "sapphire.md",
    "flask.md",
    "archer.md",
    "emerald.md",
    "brook.md",
    "oleander.md",
    "sage.md",
    "star-anise.md",
    "alpine.md",
]

markdown_snippets = [
    "## Oleander\n",
    "## Sage\n",
    "## Star Anise\n",
    "## Alpine\n",
    "## Fluffy Gargoyle\n",
    "## Hairy Outpost\n",
    "## Sapphire Forest\n",
    "## Emerald Brook\n",
    "## Elderberry Grove\n",
    "[This is an example link](https://example.com)\n",
    "![This is an example image](https://example.com/image.png)\n",
    "```python\nprint('Hello, World!')\n```\n",
    "```bash\nls -la\n```\n",
    "```javascript\nconsole.log('Hello, World!');\n```\n",
    "```html\n<!DOCTYPE html>\n<html>\n<head>\n<title>Sample HTML</title>\n</head>\n<body>\n<h1>Hello, World!</h1>\n</body>\n</html>\n```\n",
    "```css\nbody {\n  background-color: lightblue;\n}\nh1 {\n  color: white;\n  text-align: center;\n}\n```\n",
    "```json\n{\n  \"name\": \"John\",\n  \"age\": 30,\n  \"city\": \"New York\"\n}\n```\n",
    "```yaml\nname: John\nage: 30\ncity: New York\n```\n",
    "```xml\n<note>\n  <to>Tove</to>\n  <from>Jani</from>\n  <heading>Reminder</heading>\n  <body>Don't forget me this weekend!</body>\n</note>\n```\n",
    "```sql\nSELECT * FROM users WHERE age > 30;\n```\n",
    "```ruby\nputs 'Hello, World!'\n```\n",
    "```swift\nprint(\"Hello, World!\")\n```\n",
    "```go\npackage main\n\nimport \"fmt\"\n\nfunc main() {\n  fmt.Println(\"Hello, World!\")\n}\n```\n",
    "```php\n<?php\n  echo 'Hello, World!';\n?>\n```\n",
    "```r\nprint('Hello, World!')\n```\n",
    "```shell\n#!/bin/bash\necho 'Hello, World!'\n```\n",
    "```typescript\nlet message: string = 'Hello, World!';\nconsole.log(message);\n```\n",
    "lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.\n",
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.\n",
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.\n",
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.\n",
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.\n",
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.\n",
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.\n",
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.\n",
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.\n",

]

# Create Data folder if it doesn't exist
if not os.path.exists('../data'):
    os.makedirs('../data')

    # Create Sample Notebooks
    for i in range(len(notebook_names)):
        if not os.path.exists(f'../data/{notebook_names[i]}'):
            os.makedirs(f'../data/{notebook_names[i]}')

            # Create sample folders if in new notebook
            for j in range(random.randint(3, 6)):
                path = f'../data/{notebook_names[i]}/{folder_names[random.randint(0, len(folder_names) - 1)]}'
                if not os.path.exists(path):
                    os.makedirs(path)
                
                # Create sample files if in new folder
                for k in range(random.randint(3, 6)):
                    file_path = f'{path}/{file_names[random.randint(0, len(file_names) - 1)]}'
                    with open(file_path, 'w') as f:
                        f.write(f"# {file_names[random.randint(0, len(file_names) - 1)]}" + '\n\n')
                        for l in range(random.randint(10, 12)):
                            f.write(markdown_snippets[random.randint(0, len(markdown_snippets) - 1)] + '\n')