hexo generate
cp -R public/* .deploy/cczeng.github.io
cd .deploy/cczeng.github.io
git add .
git commit -m “update”
git push origin master