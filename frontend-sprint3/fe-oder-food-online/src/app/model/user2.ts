export interface User2 {
  "id": number,
  "name": string,
  "customer": {
    "id": number,
    "name": string,
    "birthDay": string,
    "address": string,
    "email": string,
    "phone": string,
    "image": string
  },
  "roles": [
    {
      "id": number,
      "name": string
    }
  ]
}
