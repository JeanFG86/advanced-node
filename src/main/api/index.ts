import '../config/module-alias'
import { PersonController } from '@/application/controllers/person'

const p = new PersonController()

console.log(p.speak())
p.speak()