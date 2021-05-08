# "refresh": "rm -Rf node_modules package-lock.json && npm install",
# "upgrade:10": "npm-check-updates --upgrade",
# "upgrade:20": "shx rm -f package-lock.json",
# "upgrade:30": "npm install",
# "upgrade": "run-s --silent upgrade:*",
# "clean:10": "shx rm -Rf coverage release/commonjs release/esmodule",
# "clean": "run-s --silent clean:*",
# "lint:10": "eslint --ext .cjs --ignore-path .gitignore source/commonjs",
# "lint:20": "eslint --ext .js  --ignore-path .gitignore source/esmodule",
# "lint:30": "depcheck",
# "lint": "run-s --silent lint:*",
# "build:10": "babel source/commonjs --copy-files --extensions .cjs --keep-file-extension --out-dir release/commonjs --source-maps",
# "build:20": "babel source/esmodule --copy-files --extensions .js  --keep-file-extension --out-dir release/esmodule --source-maps",
# "build": "run-s --silent clean lint build:*",
# "test:10": "c8 ava",
# "test": "run-s --silent build \"test:10 {@}\" --",
# "run:10": "node --no-warnings --unhandled-rejections=strict",
# "run": "run-s --silent build \"run:10 {@}\" --",
# "pre:push:10": "git add coverage release/commonjs release/esmodule",
# "pre:push:20": "git commit --message=\"post-test\"",
# "pre:push": "run-s --silent test pre:push:*",
# "push:10": "npm version prerelease",
# "push:20": "git push origin master",
# "push": "run-s --silent pre:push push:*"

sourcePath :=	$(filter-out %/.eslintrc.json, \
							$(filter-out %/.babelrc.json, \
								$(shell find source -type f)))

releasePath :=	$(sort \
									$(patsubst source/%, release/%, \
										$(sourcePath)))

.PHONY: default debug refresh upgrade build clean run test push

default: build

debug:
	@echo \"$(shell date)\"

refresh:
	@rm -rf node_modules package-lock.json
	@npm install

upgrade:
	@npm-check-updates --upgrade
	@shx rm -f package-lock.json
	@npm install

release/%: source/%
	@shx echo $@
	@eslint $<
	@babel $< --out-file $@ --source-maps

build: $(releasePath)
	@depcheck

clean:
	@shx rm -rf release

run: build
	@node --no-warnings --unhandled-rejections=strict $(argument)

test: build
	@shx rm -rf coverage
	@c8 ava $(argument)
	@git add coverage release
	@git commit --message="$(shell date)" --quiet

push: clean test
	@npm version prerelease
	@git push origin master
