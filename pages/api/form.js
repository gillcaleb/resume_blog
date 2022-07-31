export default function handler(req, res) {
    // Get data submitted in request's body.
    const body = req.body
  
    // Optional logging to see the responses
    // in the command line where next.js app is running.
    console.log('body: ', body)
  
    // Guard clause checks for first and last name,
    // and returns early if they are not found
    if (!body.email) {
      // Sends a HTTP bad request error code 
      return res.status(400).json({ data: 'Missing name, email, or mesage body' })
    }

    //This is where I do additional form validation and then process the request, i.e. send to a database or forward via email
  
    res.status(200).json({ data: `${body.name}` })
  }