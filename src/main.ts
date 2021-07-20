import alfy from 'alfy'

async function main() {
  alfy.output([
    {
      title: 'Unicorn',
      subtitle: alfy.input,
    },
  ])

  await alfy.fetch()
}

main()
