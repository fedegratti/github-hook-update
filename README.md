# github hook update
This repo has a hello world to use github push hook with aws + express.

The root path of this repo corresponds to home pad on aws vm.

## TODOS
- Enable the webhook on desired repo.
- Add a deploy key to that repo (it should be the ssd key of the aws vm).
Use: `ssh-keygen -t rsa -b 4096` to create a new ssh key if it doesn't exist.
