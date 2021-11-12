import '@virtualpatterns/mablung-source-map-support/install'

import { WorkerServer } from '@virtualpatterns/mablung-worker'

class Worker {

  static createError() {
    return new Error()
  }

}

WorkerServer.start(Worker)
