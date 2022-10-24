// Creates one thread for each unique sender, and stores the last message in the thread

export async function messageThreads(messages, loggedInUser) {
   const threads = {}
   const threadArray = []
  
   if(messages.response === []) return threadArray

   // sort messages by date
   const sortedMessages = messages.response.sort((a, b) => a.createdAt < b.createdAt ? -1 : (a.createdAt === b.createdAt ? 0 : 1))

   // create unique keys for each thread and store the messages for that thread
   sortedMessages.forEach(message => {
      if(message.sender !== loggedInUser.response._id) {
         threads[message.sender] ?
            threads[message.sender].push(message)
            : threads[message.sender] = [ message ]
      } else {
         threads[message.recipient] ?
            threads[message.recipient].push(message)
            : threads[message.recipient] = [ message ]
      }
   })

   for(const thread in threads) {
      threadArray.push(threads[thread])
   }

   return threadArray
}