# Git Branch
1. Create a git branch from master, and commit your changes there.
```
git checkout master # If not in the master branch
git checkout -b <user>-<description> # e.g. lmedina-addLoginFeature, format username this way

# After making changes...
git checkout <your branch> # If not in your branch
git add .
git commit -m "<desc>"
git push -u origin <your_branch>
```

# Code
1. Run `yarn prettier`, this fixes the code formatting automatically.
2. Run `yarn lint`, make sure there are no warnings (apart from ignore warnings) and errors.
3. Test your code locally to make sure there are no bugs or errors.

# CI
1. In the `frontend` project page, under CI/CD, you will see your push undergo our CI Pipeline.
2. This will lint, test, and build your code.
3. If the build succeeds, create a merge request under the "Merge Requests" tab. Merge `your_branch` to `staging`.
4. Contact me so that I can review the merge request.
5. If I approve the merge request, I'll ask you to check out your code in our staging environment in AWS.
6. If everything's good, I'll deploy it to production. Otherwise, if something's wrong, tell me so I can revert the commit.
