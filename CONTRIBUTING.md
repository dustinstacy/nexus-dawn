# Contributing to Nexus Dawn

I appreciate your interest in contributing to the Nexus Dawn project! Your help is valuable in making this project better. Please follow these steps to contribute effectively:

<br/>

1.  **Fork the Repository:**
    * Navigate to the Nexus Dawn repository on GitHub: [https://github.com/dustinstacy/nexus-dawn](https://github.com/dustinstacy/nexus-dawn).
    * In the top right corner of the page, click the "Fork" button. This creates a copy of the Nexus Dawn repository under your GitHub account.
  
---

2.  **Clone Your Fork Locally:**
    * Open your terminal or command prompt on your local machine.
    * Use the following `git clone` command to download your forked repository. **Make sure to replace `<your-github-username>` with your actual GitHub username:**

        ```bash
       git clone https://github.com/<your-github-username>/nexus-dawn.git
        ```

---

3.  **Navigate to the Project Directory:**
    * Once the cloning process is complete, change your current directory in the terminal:

        ```bash
        cd nexus-dawn
        ```

---

4.  **Create a Feature Branch:**
    * Before you start making any changes, it's essential to create a new branch. This keeps your work isolated and makes the pull request process cleaner.

        ```bash
        git checkout -b my-new-feature
        ```

        *Replace `my-new-feature` with a name that clearly indicates the purpose of your changes. For example, `fix-typo-in-readme` or `add-auto-battle`.*

---

5.  **Make Your Code Changes:**
    * Now, you can implement your feature or fix the identified issue.

---

6.  **Prepare Your Changes for CI:**
    * Before committing your work, it's crucial to run the `prepare` script. This script is designed to execute various tasks that ensure your code adheres to the project's standards and is ready for continuous integration (CI). These tasks include:
        * Running linters to check for code style issues.
        * Formatting the code according to project conventions.
        * Generating any necessary build artifacts.

        Execute the `prepare` script using npm:

        ```bash
        npm run prepare
        ```

    >**Pay close attention to the output of this script.** If it reports any warnings or errors related to linting or formatting, you should address them before committing. A successful `prepare` script significantly increases the chances of your pull request being accepted smoothly.

---

7.  **Commit Your Changes:**
    * Once you have made your changes and the `prepare` script has run without any issues, stage your changes using `git add`:

        ```bash
        git add .
        ```

    * Then, commit your staged changes with a clear and informative commit message. Follow any commit message conventions the project might have:

        ```bash
        git commit -m 'Add some feature'
        ```

        *A good commit message briefly describes the purpose of your changes.*

---

8.  **Push to Your Fork on GitHub:**
    * After committing your changes locally, you need to upload them to your forked repository on GitHub:

        ```bash
        git push origin my-new-feature
        ```
        
        *Replace `my-new-feature` with the branch name you chose.*

---

9.  **Push to Your Fork on GitHub:**
    * Navigate to your forked repository on GitHub in your web browser.
    * You should see a button or prompt that says something like "Compare & pull request." Click on this.
    * Add a clear and comprehensive title and description to your pull request. Explain the purpose of your changes, any context that might be helpful, and any potential issues or considerations.
    * Finally, click the "Create pull request" button.


<br/>

Thank you for your contribution to Nexus Dawn! I will review your pull request and provide feedback or merge it into the main repository.
