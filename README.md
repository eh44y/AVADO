# final_project

### 작업 전(repository 가져와야 될 경우)

* 작업할 폴더 경로에서 마우스 우클릭 **Open Git Bash Here** 클릭
* ***Git Bash***에 밑에 코드 입력
```
git clone https://github.com/gamnyan/final_project.git
```
```
cd final_project
```
> 👇 xx = branch name
```
git checkout -b xx
```
```
code .
```

### 작업 전&중(작업중인 소스 업데이트 필요)

* ***Git Bash***에 밑에 코드 입력(경로는 /final_project)
```
git add .
```
> 👇 xx = 코맨트
```
git commit -m "xx"
```
```
git pull origin sub
```

### 작업 후

* ***Git Bash***에 밑에 코드 입력
```
git add .
```
> 👇 xx = 코맨트
```
git commit -m "xx"
```
> 👇 xx = 작업하던 branch 이름
```
git push origin xx
```
* 깃허브에서 Pull requests 후 merge
