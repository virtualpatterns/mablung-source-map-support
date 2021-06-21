
ifeq ($(origin projectPath),undefined)
export projectPath := $(CURDIR)
endif

include $(projectPath)/node_modules/@virtualpatterns/mablung-makefile/makefile
