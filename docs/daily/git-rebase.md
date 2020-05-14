# 使用 git rebase 合并多个 commit
日常开发或者参与开源项目时我们常常有这种情况：
```bash
~ git log

commit abasdlkj...
    feat(xxx): 修复细节1...

commit aksdhkja...
    feat(xxx): 修复细节2...
...
commit ajhsdhdh...
    feat(xxx): 支持xxx功能...
```
面对多个 commit 只为解决一个需求或 bug 时候如果直接 merge 到主分支上的话会导致主分支的 git 操作日志非常混乱，如果遇到需要代码回滚情况时根本不知道哪个 commit 做了什么，甚至在开源项目中对于后来想要参与的开发人员来说只能硬着头皮把最新的代码啃下来。

这里介绍一下 `git rebase` 指令去如何合并多个 commit，也希望大家能在日常开发中尽量做到规范化（尤其是面向开源的项目）。

### 1 查看提交历史: git log
首先你要知道自己想合并的是哪几个提交，可以使用git log命令来查看提交历史，假如最近4条历史如下：
```bash
commit 3ca6ec340edc66df13423f36f52919dfa3......

commit 1b4056686d1b494a5c86757f9eaed844......

commit 53f244ac8730d33b353bee3b24210b07......

commit 3a4226b4a0b6fa68783b07f1cee7b688.......
```

### 2 git rebase
想要合并1-3条，有两个方法

1. 从HEAD版本开始往过去数3个版本
```bash
git rebase -i HEAD~3
```
2. 指名要合并的版本之前的版本号
```
git rebase -i 3a4226b
```

### 3 选取要合并的提交
1. 执行了rebase命令之后，会弹出一个窗口，头几行如下：
```bash
pick 3ca6ec3   '注释**********'

pick 1b40566   '注释*********'

pick 53f244a   '注释**********'
```

2. 将pick改为squash或者s,之后保存并关闭文本编辑窗口即可。
    - pick 的意思是要会执行这个 commit
    - squash 的意思是这个 commit 会被合并到前一个commit
改完之后文本内容如下：
```bash
pick 3ca6ec3   '注释**********'

s 1b40566   '注释*********'

s 53f244a   '注释**********'
```
然后输入:wq以保存并退出。

3. 然后保存退出，Git会压缩提交历史，如果有冲突，需要修改，修改的时候要注意，保留最新的历史，不然我们的修改就丢弃了。修改以后要记得敲下面的命令：
```bash
git add .  

git rebase --continue  
```
如果你想放弃这次合并的话，执行以下命令：
```bash
git rebase --abort  
```

4. 如果没有冲突，或者冲突已经解决，则会出现如下的编辑窗口：
```bash
# This is a combination of 4 commits.  
#The first commit’s message is:  
注释......
# The 2nd commit’s message is:  
注释......
# The 3rd commit’s message is:  
注释......
```

5. 输入wq保存并推出, 再次输入git log查看 commit 历史信息，你会发现这两个 commit 已经合并了。

### 4 推向远端
如果这个分支之前已经推上过远端的话，此时需要使用 `git push origin xxx -f` 去覆盖 git 历史。

