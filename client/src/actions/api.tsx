import axios from 'axios'
import { Task } from '../types/Task'

export class Actions {
  static deleteTask (id: number): Promise<number> {
    return new Promise((resolve, reject) => {
      axios.get("/api/delete/" + id)
      .then(response => {
        let data = response.data

        if (data.hasOwnProperty("error")) {
          reject(data.error)
        }

        resolve(1)
      })
      .catch(error => reject(error))
    })
  }

  static getAll(): Promise<Task[]> {
    return new Promise((resolve, reject) => {
      axios.get("/api/get")
      .then(response => {
        let data = response.data
        
        if (data.hasOwnProperty("error")) {
          reject(data.error)
        }
        resolve(data.tasks)
      })
      .catch(error => reject(error))
    })
  }

  static create(description: string, duein: number): Promise<number> {
    return new Promise((resolve, reject) => {
      axios.post("/api/create", {
        description: description,
        duein: duein
      })
      .then(response => {
        let data = response.data

        if (data.hasOwnProperty("error")) {
          reject(data.error)
        }

        resolve(data.id)
      })
      .catch(error => reject(error))
    })
  }

  static updateTask(id: number, description: string, duein: number) {
    return new Promise((resolve, reject) => {
      axios.post("/api/update", {
        id: Number(id),
        description: String(description),
        duein: Number(duein)
      })
      .then(response => {
        let data = response.data

        if (data.hasOwnProperty("error")) {
          reject(data.error)
        }

        resolve(1)
      })
      .catch(error => reject(error))
    })
  }
}


export default Actions
