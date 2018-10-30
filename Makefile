.PHONY: dist
default: help

dev:
	npm run dev

dist:
	rm -rf dist
	npm run build

dep:
	npm install

clean:
	rm -rf node_modules
	rm package-lock.json

help:
	@echo "\033[35mmake\033[0m \033[1m命令使用说明\033[0m"
	@echo "\033[35mmake dev\033[0m \033[1m开发模式\033[0m"
	@echo "\033[35mmake dist\033[0m \033[1mbuild模式\033[0m"
	@echo "\033[35mmake dep\033[0m \033[1m安装依赖\033[0m"
