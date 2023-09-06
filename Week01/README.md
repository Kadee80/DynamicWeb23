## Syllabus Review

## Introductions, Attendance

## Required Software

- Browser – Chrome or Firefox
- Browser Add Ons – Google Developer Tools and FireBug
- [VS Code](https://code.visualstudio.com/download) (or Coda, Textmate, TextWrangler. Class tutorials will be using **VS Code** (These editors are great because they have useful packages to instal)

  - Honestly, I can't say it better than the Walkthroughs on VS Code itself, you can easily access them by opening Atom without any of your files/projects open.
  - Extensions (You'll thank me later) Extensions can be searched for, installed and configured by clicking the 5th nav icon on the left (hover to see descriptions of any NavBar item) or by the shortcut `Shift+Cmd+X` (Mac) or `Shift+Ctrl+X` (Windows). Once the extension browser is open search for and install:
    - Prettier - Code formatter
    - Prettify JSON
    - then customize by following the instructions in the main panel/window for each extension installed

- Wireframing Software –
  - Power Point
  - Keynote
  - Figma
  - Sketch
  - Honestly, any software where you can draw rectangles etc and block out basic layout of a web page
- Design and Graphics – [Adobe Creative Cloud (Photoshop)](http://www.adobe.com/creativecloud/buy/students.html?promoid=65FN7X8B&mv=other) **NYU Tandon School of Engineering has a discount plan for Students.**

### Git, Github, Class Files

- Git is a widely used version control software which we can access via the command line of our computers. First, lets install Git on our computers.

  - [Install Git](https://github.com/git-guides/install-git)

- GitHub is a web-based Git repository hosting service. You can use it as a backup of your git repositories, or to collaborate as a team on a project. We will be using it to keep track of our in class, and homework files.

  - First, lets all [create GitHub accounts](https://github.com/join)
  - Next, we need to set up Git and Authenticate our GitHub account. [Follow the instructions here](https://help.github.com/articles/set-up-git/).

  - Now, that we are set up, lets clone the class file repository so you can always have access to the latest in class exercises with a simple pull request.

- Open Terminal on Mac, or the Command Line on Windows:

  - List the current files and folders in your current directory:

  OSX:

  ```
  ls
  ```

  Windows:

  ```
  dir
  ```

  **note - all of these commands are executed by the enter key. So if you see a series of commands in a row, assume you hit enter after each individual command**

  The terminal should list out the file system at the root of your computer. We can move in and out of folders using `cd` which stands for change directory. cd is always followed by the folder or route you wish to move to. For example. When I open terminal, and type `ls` I can see a Desktop and a Documents directory along with many others. If i wish to navigate to my Desktop and type:

  ```
  cd Desktop
  ```

  and then `ls` on Mac or `dir` on Windows the command line will print out the current files and folders on my desktop.

  If we need to jump back out of a folder using the command line, we can type

  ```
  cd ../
  ```

  Now if we list the contents of our current directory, we will see we have moved back into the parent folder. Lets take a moment to practice moving around our computers file system using `cd` and reading out contents using `ls` or `dir`.

  Now clone your forked copy of the class repo to the directory we just created on our Desktop (You are welcome to do all of this to your Documents folder instead).

  Go to the [Class Repository](https://github.com/Kadee80/DynamicWeb23). Click on the **Clone or Download** button in the upper right. Copy the SSH link that appears.

  Back in Terminal/Command Line. Type

  ```
  git clone https://github.com/Kadee80/DynamicWeb23.git
  ```

  `git clone` is the git command, the `url` that follows is the link we copied so we could clone this repo.

  Now you have a copy of our in class notes/examples on your local machine! To update this repo to my current version at any time, you can do so by navigating to this front_end_web_F16 folder in terminal and typing:

  ```
  git pull
  ```

  To sync your folder with the class repo. If you accidentally edit these files and are no longer able to pull, you can always delete your local copy and clone again. _If you're feeling like a Git master already, you can try [forking the repository](https://help.github.com/articles/syncing-a-fork/) instead._

### Making Your Own Class/HW File Repository.

While in signed in to Github. Go to your account page and click the `Repositories` tab.

- Click New
- Name it something unique but descriptive
- Feel free to edit the READEME.md with a longer description
  - Click the Clone/Download Button in the upper right (just like we did for the class files)
- In terminal, navigate to the folder we made earlier for you class files. :

```
cd WebDevClassFiles
```

**IMPORTANT**- note that we are in the Class Files folder, not the folder we cloned with the in class examples! So if we type `ls` or `dir` we should see the front_end_web_F16 class folder.

We are going to clone you HW directory into the `WebDevClassFiles` folder, NOT the class example folder. You will take notes, make edits and push your HW assignments to YOUR HW REPO _not_ the class example master repo.

You have created a repo on GitHub for your HW. Navigate to it, grab to the clone url from the `Clone or Download` button. Make sure you are in your WebDevClassFiles folder, then type:

```
git clone [your clone url copy paste here]
```

**Pro Tip: You can type cd + [Space] and then drag and drop any folder into your terminal window and it will automatically populate with that directory's location.**

### Adding and Editing Files, Pushing and Committing Changes.

Every week, you will be committing files and folders to your HW repo, and pushing them to your online GitHub repo for me to review. This is how you will submit your HW code.

- Lets open your repo in sublime text and create a new subfolder called `Hello World`
- Next, create a file named README.md in the Hello_World folder
- Open the file, type anything you like (Keep in mind this will be published on GitHub in a few minutes. So keep it professional.) And save the file.

- Back in terminal, navigate to your HW repo folder.

- Use `ls` or `dir` to make sure you are in the correct folder.

In terminal

```
git status
```

You should now see a list of files and folders that git is not keeping track of yet. In our case is would be Hello_World/ and the README.md within. To add the current state of this file and folder we use `git add` + `file or folder name`.

```
git add Hello_World
git add Hello_World/README.md
```

or if we want to add any and everything new or updated to git :

```
git add *
```

Now we commit with a message:

```
git commit -m "Initial Commit, In class exercise"
```

Finally, we need to `push` our local repos changes to our GitHub repository.

```gi
git push
```

Take a look at your online repo. It should match your local computers if you used ` git add` `git commit` and `git push` correctly.

_Helpful Resources_

- [Command Line Cheat Sheet Windows](http://simplyadvanced.net/blog/cheat-sheet-for-windows-command-prompt/)
- [Terminal Cheat Sheet Mac](https://github.com/0nn0/terminal-mac-cheatsheet)
- I will be teaching on a MAC, for the terminal/command line equivaltents see this [handy article](http://skimfeed.com/blog/windows-command-prompt-ls-equivalent-dir/).

---

_Helpful Resources_

- [Command Line Cheat Sheet Windows](http://simplyadvanced.net/blog/cheat-sheet-for-windows-command-prompt/)
- [Terminal Cheat Sheet Mac](https://github.com/0nn0/terminal-mac-cheatsheet)
- I will be teaching on a MAC, for the terminal/command line equivaltents see this [handy article](http://skimfeed.com/blog/windows-command-prompt-ls-equivalent-dir/).

---

### Bonus: What if we want to add an exisiting project from our local computer to a GitHub Repository?

- follow the instructions above to create a new online repository on GitHub.

- in terminal/command line execute the following commands:

```
cd [your local folder here]
git init
git add .
git commit -m "initial commit"
git remote add origin https://github.com/USERNAME/REPONAME.git
git branch -M main
git push -u origin main

```

_a tutorial on how to do this is generated when you create an online repo on Github_

You can also [follow the tutorial here](https://help.github.com/articles/adding-an-existing-project-to-github-using-the-command-line/)
