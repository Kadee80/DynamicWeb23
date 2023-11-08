import Accordion from '../components/Accordion'

const items = [
  {
    id: '123',
    heading: 'How many chickens should I own?',
    content:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin sed maximus nunc, a scelerisque erat. Curabitur dapibus mauris ut eros vestibulum lacinia at in nisi. Praesent gravida lacus pharetra, aliquet diam et, aliquam leo. Suspendisse malesuada, nibh at lobortis egestas, dui lacus eleifend ligula, sed blandit nunc ipsum non magna. Morbi risus lacus, viverra ac nisi quis, aliquam tempor risus. Pellentesque egestas tempus lectus. Duis odio erat, ornare sit amet varius in, gravida rhoncus sem. Curabitur vehicula orci finibus leo lacinia, sit amet malesuada neque faucibus. Phasellus a pellentesque leo. Vivamus egestas mauris vitae viverra posuere. Phasellus vulputate mauris ac urna tempor, eget maximus est lobortis. Fusce nisl orci, dignissim vel dui vel, tincidunt cursus nisi.',
  },
  {
    id: '456',
    heading: 'Do I need a rooster?',
    content:
      'Quisque vestibulum faucibus volutpat. Sed vitae elementum libero. Quisque accumsan erat eget nisl maximus, vel pulvinar nisl vestibulum. In hac habitasse platea dictumst. Integer id massa vitae sem porttitor egestas quis nec ante. Praesent consectetur cursus lacus, ut sodales lacus bibendum at. Nulla eu libero et ligula malesuada posuere porttitor et mi. Mauris orci nibh, bibendum vitae neque ut, porttitor fermentum nisl. Maecenas blandit arcu non nunc mattis, vel ornare tellus efficitur.',
  },
  {
    id: 'l1kj2i0g',
    heading: 'When do chickens molt?',
    content:
      'Duis eget turpis vel ligula imperdiet suscipit eu ut felis. Ut eget neque at ligula aliquam ultricies eu vitae dolor. Proin eu dignissim velit. Morbi convallis volutpat nisl at vulputate. Interdum et malesuada fames ac ante ipsum primis in faucibus. Etiam non dignissim sem. Aliquam cursus, tortor at iaculis fermentum, felis tortor interdum justo, eu ornare lorem dui eu lorem. Phasellus nibh sem, tempus at fermentum vel, pulvinar at tellus. Nunc eleifend velit at massa bibendum placerat. Sed tincidunt vestibulum ante ut pellentesque. Duis eget nisl varius, dapibus nunc sed, aliquam diam',
  },
]

export default function AccordionPage() {
  return (
    <div>
      <Accordion items={items} />
    </div>
  )
}
