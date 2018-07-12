# HELLO-HTTP

This API allows users to:
* GET /happy-birthday
    * The server will respond with "Happy birthday, Stranger!"
    * Optional: happy-birthday/<name> will replace Stranger with given name.
    * Optional: including a 'custom' query will append the custom message to the Happy Birthday message.
* GET /fact
    * The server will provide a randomly chosen neat fact about HTTP.
* GET /codenames
    * The server will provide 25 random words from the list of words in Code Names.
* POST /caps
    * Sending a string to the server will return with the same string but each word will be capitalized.
    * Optional: 'option' query can be 'all' to capitalize all letters in the string.
    * Optional: When 'option' query is an integer, the server will capitalize the letter of each word where the integer is the letter's index. (e.g. option=1 will capitalize the 2nd letter of each word)
    * Optional: 'option=last' will capitalize the last letter of each word.