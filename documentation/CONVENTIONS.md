# Conventions

## Coding Conventions

### Javascript

- Use Prettier and ESLint for code formatting and code conventions
- Prefer ES2018
- Airbnb coding style: [Documentation](https://github.com/airbnb/javascript)

### Dockerfiles

- Prefer COPY over ADD
- When using RUN, prefer seperated lines when doing several things

### Rust

These coding conventions shall be defined later.

## Commit conventions

1. A commit should be atomic: self-sufficient, non-breaking, no regressions
2. One branch per feature, tests are commited on the feature branch
3. When creating a new branch, prefix its name with your pseudonym `<pseudo>/<branch_name>`
4. Commit messages should be in english
5. Commit names should be short. Should you want to add a more explicit documentation, you can add it on a new line:

   ```text
   Commit name

   Commit documentation...
   ...
   ..
   ```

6. When several people are coding on the same branch, always use pull rebase to resolve merge conflicts. You can set it up to be the default behaviour with:

    ```bash
    git config --local pull.rebase true
    ```

### Commit Messages

- Non-code Branches (Doc, Env, CI/CD)
  - `<Tag>: Explicit Commit Message`
- Feature
  - `Feat(Feature name or file): Explicit message`
- Fix
  - `Fix(Feature name or file): What is fixed`
- Test
  - `Test(Feature name or file): what part of the feature is tested`