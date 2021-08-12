import '../install.js'

async function main() {

  try {
    throw new Error('Hello, world!')
  }
  catch (error) {
    console.error(error)
  }

}

main()