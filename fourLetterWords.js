/*Our Setup
Alice and Bob work in an office. When the workload is light and the boss isn't looking, they sometimes play simple word games for fun. This is one of those days!

Today's Game
Alice and Bob are playing what they like to call Mutations, where they take turns trying to "think up" a new four-letter word (made up of four unique letters) that is identical to the prior word except for only one letter. They just keep on going until their memories fail out.

Their Words
Alice and Bob have memories of the same size, each able to recall 10 to 2000 different four-letter words. Memory words and initial game word are randomly taken from the same list of 4000 (unique, four-letter, lowercased) words, any of which may appear in both memories.

The expression to "think up" a new word means that for their turn, the player must submit as their response word the first valid, unused word that appears in their memory (by lowest array index), as their memories are ordered from the most "memorable" words to the least.

The Rules
a valid response word must contain four unique letters
1 letter is replaced while the other 3 stay in position
it must be the lowest indexed valid word in that memory
this word cannot have already been used during the game
the final player to provide a valid word will win the game
if 1st player fails 1st turn, 2nd can win with one word
when both players fail the initial word, there is no winner
Your Task
To determine the winner!

Some Examples
alice = plat,rend,bear,soar,mare,pare,flap,neat,clan,pore

bob   = boar,clap,farm,lend,near,peat,pure,more,plan,soap

In the case of word = "send" and first = 0:
Alice responds to send with rend
Bob responds to rend with lend
Alice has no valid response to lend
Bob wins the game.
In the case of word = "flip" and first = 1:
Bob has no valid response to flip
Alice responds to flip with flap
Alice wins the game.
In the case of word = "calm" and first = 1:
Bob has no valid response to calm
Alice has no valid response to calm
Neither wins the game.
In the case of word = "more" and first = 1:
Bob has no valid response to more **
Alice responds to more with mare
Alice wins the game.
In the case of word = "maze" and first = 0:
Alice responds to maze with mare
Bob responds to mare with more **
Alice responds to more with pore
Bob responds to pore with pure
Alice responds to pure with pare
Bob has no valid response to pare
Alice wins the game.
** Note that in these last two cases, Bob cannot use mere because it has two e's.

Input
alice ~ a(n) array/list/tuple/vector (10 <= size <= 2000) of four-letter words
bob ~ a(n) array/list/tuple/vector (10 <= size <= 2000) of four-letter words
word ~ the initial four-letter challenge word of the game
first ~ an integer (either 0 for Alice or 1 for Bob)
Output
0 if Alice wins
1 if Bob wins
-1 if both fail */

//My solution 

function mutations(alice,bob,word,first){
    let aliceTable =alice.slice();
    let bobTable =bob.slice();
   let scoreAlice = 0 ;
   let scoreBob = 0 ;
  let p=first;
   let x=0;
   let result ={}
   let otherScore=1;
   let loserAlice =false ;
   let loserBob =false
   
   let checkTab=[];
   checkTab.push(word);
   
 
   
   
   function verify (word){
     let unique = true ; 
      for (let i=0; i<word.length ; i++){
     
       for (let j=0; j<word.length ; j++){
         
         
         if ( (word[i]==word[j]) && (i!=j))
         {
           unique = false ; 
         }        
         
         
         
         }
      }
      return unique;   
   }
   
   
   
   
   
   function same (w , word){
     
     x=0;
     
     for (i=0; i<word.length ; i++){
     
       
         
         if (w[i]==word[i]){
           x=x+1;
          
         
       }
     }
    if (x==3)
    { return true} 
     else
     { return false}
    
   }
   
   
   function cow(player , word , score,p, otherScore,loser){
     p++;
     console.log("bdew b word", word)
     for (let w of player){
      
       if ((same(w, word)) && (verify(w))&&(checkTab.indexOf(w)<0)){
         word=w; 
         checkTab.push(w)
         let index =player.indexOf(w)
         player.splice(index,1);
         score =1;
         otherScore =0;
         loser = false;
          console.log ("lokhra",player , word , score,p,loser)
          return {player : player, word : word, score : score , p : p ,otherScore : otherScore , loser : loser};
    
       
       }else{
         score =0;
         loser =true;
       }
       
       
     }
     console.log (player , word , score,p,loser)
    return {player : player, word : word, score : score , p : p ,otherScore : otherScore , loser : loser}
   
   }
   
   
   
   
   
  do {
     

     if (first==0){
       
       result = cow(aliceTable,word,scoreAlice, p ,loserAlice)
       alice=result.player ; 
       word=result.word;
       scoreAlice = result.score;
       p =result.p;
       first =p%2;
       scoreBob=result.otherScore;
       loserAlice =result.loser;
  
      
     } else 
       {
         result = cow(bobTable,word,scoreBob ,p,loserBob);
         
         bob=result.player ; 
       word=result.word;
       scoreBob = result.score;
       p =result.p;
         first =p%2;
          scoreAlice=result.otherScore;
         
          loserBob =result.loser;
        }
     
  
     
   } while (!((loserAlice)&&(p>1)||(loserBob)&&(p>1)))
     
     
       alice = aliceTable.slice();
       bob=bobTable.slice();
   
   
     if (!(loserAlice)&&(loserBob)){
       return 0 ;
     } else if ((loserAlice)&&!(loserBob)) {
       return 1 ;
     } else {
       return -1;
     }
 
   
 }