// //<------------- LINKED LIST
// 
// 
// //create blueprint for each item inside LinkedList (each node)
// class LinkedListItem {
//   value:any;
//   next:LinkedListItem = null; 
// 
//   constructor(val) {
//     this.value = val;
//   }
// }
// 
// //Create blueprint for Linked Lists
// class LinkedList {
//   head: LinkedListItem;
// 
//   constructor(item:LinkedListItem) {
//     this.head = item; // add tail
//   }
// 
// 
//   //Add element in the end of LinkedList
//   append(val) {
//     let newItem = new LinkedListItem(val);
//     if (this.head) {
//       let currentItem = this.head;
//       while (true) {
//         if (currentItem.next) {
//           currentItem = currentItem.next;
//         } else {
//           currentItem.next = newItem;
//           break;
//         }
//       } 
//     } else { //exception for empty LinkedList
//       this.head = newItem;
//     }
//   } //do with tail and remove true from while loop
// 
// 
// 
//   //Add element in the beginning of LinkedListItem
//   prepend(val) {
//     let newItem = new LinkedListItem(val);
//     let previousHead = this.head;
//     this.head = newItem;
//     newItem.next = previousHead;
//   }
// 
//   //Add new element in a specific place in LinkedList
//   insert(val, previousNodeValue) { // add method to insert by position
//     let newItem = new LinkedListItem(val);
//     let currentItem = this.head;
//     if (currentItem) {
//       while (true) {
//         if (currentItem.value === previousNodeValue) {
//           let temp =currentItem.next;
//           currentItem.next = newItem;
//           newItem.next = temp;
//           break;
//         } else {
//           currentItem = currentItem.next;
//         }
//       }
// 
//     } else { // exception for empty LinkedList
//       this.head = newItem;
//     }
//   }
// 
//   //Remove element from LinkedList by its value 
//   remove(val) {
//     let currentItem = this.head;
//     let previousItem = null;
//     if (currentItem.value === val) { //case when we remove first item
//       this.head = currentItem.next;
//     } else {
//       while (true) {
//         if (currentItem.value === val) {
//           if (currentItem.next) {
//             previousItem.next = currentItem.next;
//           } else { //case when we remove last item
//             previousItem.next = null;
//           }
//           break;
//         } else {
//           previousItem = currentItem;
//           currentItem = currentItem.next;
//         }
//       }
//     }
// } // removing items that not exist
// 
// 
//   //To see each element in LinkedList by value
//   showInArray() {
//         let arr = [];
//         let currentItem = this.head;
// 
//         while (true) {
//             arr.push(currentItem.value);
// 
//             if (currentItem.next) {
//                 currentItem = currentItem.next;
//             } else {
//                 break;
//             }
//         }
// 
//         return arr;
//     }
// 
// }
// 
// let node1 = new LinkedListItem("node1");
// console.log(node1);
// let myLinkedList = new LinkedList(node1);
// console.log(myLinkedList.showInArray());
// myLinkedList.append("node2");
// console.log(node1);
// console.log(myLinkedList.showInArray());
// myLinkedList.append("node3");
// console.log(myLinkedList.showInArray());
// myLinkedList.prepend("node0");
// console.log(myLinkedList.showInArray());
// myLinkedList.insert("node2.5", "node2");
// console.log(myLinkedList.showInArray());
// myLinkedList.remove("node0");
// console.log(myLinkedList.showInArray());
// myLinkedList.remove("node2");
// console.log(myLinkedList.showInArray());
// myLinkedList.remove("node3");
// console.log(myLinkedList.showInArray());
// 
// 
// /* 
// benefits of previous node property
// add genericks
// */
// 
// 


// ******** Linked List with previousNode, tail, position and genericks

class LinkedListItem<T> {
  public value:T;
  public next:LinkedListItem<T> = null; 
  public previous:LinkedListItem<T> = null;
  public position:number = 0;
  
  constructor(val:T) {
    this.value = val;
  }
}

class LinkedList<U> {
  private head: LinkedListItem<U>;
  private tail: LinkedListItem<U>;
  
  constructor(item:LinkedListItem<U>) {
    this.head = item;
    this.tail = item;
  }
  
  
  //Add element in the end of LinkedList
  append(val) {
    let newItem = new LinkedListItem(val);
    if (this.head) {
      let previousTail = this.tail;
      previousTail.next =  newItem;
      this.tail = newItem;
      newItem.previous = previousTail;
      newItem.position = previousTail.position + 1;
      
    } else { //exception for empty LinkedList
      this.head = newItem;
      this.tail = newItem;
    }
  }
  
  
  
  //Add element in the beginning of LinkedListItem
  prepend(val) {
    let newItem = new LinkedListItem(val);
    let previousHead = this.head;
    this.head = newItem;
    newItem.next = previousHead;
    previousHead.previous = newItem;
  
    // changes position of each node in linked list
    let currentItem = this.head.next;
    while(currentItem) {
      currentItem.position += 1;
      currentItem = currentItem.next
    }
  }
  
  //Add new element in a specific place in LinkedList
  insert(val, insertPosition) { 
    let newItem = new LinkedListItem(val);
    let currentItem = this.head;
    if (this.head) { // LinkedList is not empty
      if (insertPosition > this.tail.position) { // no position available
        console.log("there is no such position to insert in your current Linkedlist");
      } else {
        while (currentItem) { 
          if (insertPosition <= currentItem.position) {
            if (currentItem.position === insertPosition) {
              let temp = currentItem;
              temp.previous.next = newItem;
              newItem.previous = temp.previous;
              newItem.next = temp;
              newItem.position = temp.position;
              currentItem.position +=1;
              currentItem = currentItem.next;
            } else { //after insertion we need to increment each position by one
              currentItem.position += 1;
              currentItem = currentItem.next;
            }
          } else {
            currentItem = currentItem.next;
          }
        }
      }
  
    } else { // exception for empty LinkedList
      this.head = newItem;
      this.tail = newItem;
    }
  }
  
  // Remove element from LinkedList by its position 
  remove(positionToRemove) {
    let currentItem = this.head;
    if (this.head) { // LinkedList is not empty
      if (positionToRemove === 0) { //special case to remove first item
        this.head = currentItem.next;
        currentItem.next.previous = null;
        while(currentItem) { // decrements each item position by one after removing first item
          currentItem.position -= 1;
          currentItem = currentItem.next;
        }
      } else if (positionToRemove === this.tail.position){ // special case to remove last item
        this.tail = this.tail.previous;
        this.tail.next = null;
      } else if (positionToRemove > this.tail.position) { // no position available
        console.log("there is no such position to remove in your current Linkedlist");
      } else {
        while (currentItem) { 
          if (positionToRemove <= currentItem.position) {
            if (currentItem.position === positionToRemove) {
              currentItem.previous.next = currentItem.next;
              currentItem.next.previous = currentItem.previous;
              currentItem = currentItem.next;
            } else { //after deletion we need to decrement each position by one
              currentItem.position -= 1;
              currentItem = currentItem.next;
            }
          } else { // for items from position 0 to positionToRemove
            currentItem = currentItem.next;
          }
        }
      }
    } else { // exception for empty LinkedList
      console.log("your LinkedList is already empty")
    }
  }

  
  
  //To see each element in LinkedList by value
  showInArray() {
    let arr = [];
    let currentItem = this.head;

    while (true) {
      arr.push(currentItem.value);
      if (currentItem.next) {
        currentItem = currentItem.next;
      } else {
        break;
      }
    }
    return arr;
  }
    
}

let node1 = new LinkedListItem<string>("node1");
let myLinkedList = new LinkedList<string>(node1);
console.log(myLinkedList.showInArray());

myLinkedList.append("node2");
myLinkedList.append("node3");
myLinkedList.append("node4");
myLinkedList.append("node5");
console.log(myLinkedList.showInArray());

myLinkedList.append("node6");
console.log(myLinkedList.showInArray());


myLinkedList.prepend("node0");
myLinkedList.prepend("node-1");
console.log(myLinkedList.showInArray());


myLinkedList.insert("node33", 33);
myLinkedList.insert("node34", 3);
console.log(myLinkedList.showInArray());


myLinkedList.remove(19);
console.log(myLinkedList.showInArray());

myLinkedList.remove(0);
console.log(myLinkedList.showInArray());

myLinkedList.remove(0);
console.log(myLinkedList.showInArray());

myLinkedList.remove(3);
console.log(myLinkedList.showInArray());

myLinkedList.remove(5);
console.log(myLinkedList.showInArray());

console.log(myLinkedList);












//<---------------- N E S T E D   C L A S S E S

class Animal {
  static Carnivora = class {
    type:string;
    constructor(type) {
      this.type = type;
    }
  }
}

let myDog = new Animal.Carnivora("canis");
console.log(myDog);


//<--------------- F I B O N A C C I   S E Q U E N C E

//looping version 1 (for loop)
let loopingFibonacci1 = function(n) {
    let a = 0;
    let b = 1;
    let f = 1;
    for(let i = 2; i <= n; i++) {
        f = a + b;
        a = b;
        b = f;
    }
    return f;
};


//looping version 2 (while loop)
function loopingFibonacci2(num){
  let a = 1;
  let b = 0;
  let temp;

  while (num >= 0){
    temp = a;
    a = a + b;
    b = temp;
    num--;
  }
  return b;
}

let result = loopingFibonacci1(260);
console.log(result);

//recursive version (Recursive function is a function that calls itself. Every recursive function has a base case and a recursive step. Function performs its recursive step again and again until it reaches its base case)
let recursiveFibonacci1 = function(n) {
  if(n <= 2) { //<--base step
      return 1;
  } else { //<--recursive step
    return this.recursiveFibonacci1(n - 1) + this.recursiveFibonacci1(n - 2);
  }
};


// Memoization version 1 (Memoization is an optimization technique used to speed up computer programs by storing the results of expensive function calls. We store the value of each index in a hash,so we will avoid the computational time of that value for the next N times):
function memoizationFibonacci1(num, memo) {
  memo = memo || {};

  if (memo[num]) return memo[num];
  if (num <= 1) return 1;

  return memo[num] = memoizationFibonacci1(num - 1, memo) + memoizationFibonacci1(num - 2, memo);
}

//Memoization version 2 (In the example, a self-executing anonymous function returns an inner function, f(), which is used as the Fibonacci function. When f() is returned, its closure allows it to continue to access the “memo” object, which stores all of its previous results. Each time f() is executed, it first checks to see if a result exists for the current value of “n”. If it does, then the cached value is returned. Otherwise, the original Fibonacci code is executed. Note that “memo” is defined outside of f() so that it can retain its value over multiple function calls.)
let memoizationFibonacci2 = (function() {
  let memo = {};

  function f(n) {
    let value;

    if (n in memo) {
      value = memo[n];
    } else {
      if (n === 0 || n === 1)
        value = n;
      else
        value = f(n - 1) + f(n - 2);

      memo[n] = value;
    }

    return value;
  }

  return f;
})();


/* Example with input = 50:

----While loop

Time complexity: O(N)
Space complexity: Constant
Function calls: 51
Time needed: 0.000001ms


----Recursion

Time complexity: O(2^N)
Space complexity: O(n)
Function calls: 20.365.011.074
Time needed: 176.742ms


----Memoization

Time complexity: O(2N)
Space complexity: O(n)
Function calls: 99
Time needed: 0.000001ms
*/

//simple recursion example (factorial)
function fact(n:number):number {
  if (n <= 1) { // base case
    return 1;
  } else {
    return n*fact(n-1);    
  }    
}

console.log("recursion", fact(5));

//boggle or sudoku



//<----------- P O L Y M O R P H I S M 

// EXAMPLE1 with clas inheritance

interface Animal{
    eat():void;
    sleep():void;
}

class Mammal implements Animal{

    constructor(private name:string){
        console.log(this.name, "is alive");
    }

    eat(){
        console.log("Like a mammal");
    }

    sleep(){
        console.log("Like a mammal");
    }
}

class Dog extends Mammal{
    eat(){
        console.log("Like a dog")
    }
}

let mammal: Mammal = new Mammal("Mammal");
let dolly: Dog = new Dog("Dolly");
let prisca: Mammal = new Dog("Prisca"); 

function makeThemEat (animal:Animal):void{
    animal.eat();
}

makeThemEat(mammal);
makeThemEat(dolly);
makeThemEat(prisca);


//Example 2 with interface implementation

interface Shape {
  surface();
}

class Rectangle implements Shape {
  constructor(public l: number, public w: number) {
    this.l = l;
    this.w = w;
  }
  surface() :Number {
    return this.l * this.w;
  }
}

class Circle implements Shape{
  constructor(public r: number) {
    this.r = r;
  }
  surface() :Number {
    return this.r * this.r;
  }
}

function surface(shape:Shape) {
  return shape.surface();
}

let c = new Circle(5);
let r = new Rectangle(2,3);

console.log(surface(c));
console.log(surface(r));

//linked list circular
// Fibonacci: with high numbers 50 (exponential to number)
// convert fraquency to hash table
// hash table : build basic hash data structure
// binary trees - build classes with it, bigO notation

// algorithms: store frequencies
function frequency(array) {

  let output = {};
  for(let i = 0; i < array.length; i++) {
    
    let counter = 0;
    for(let j = 0; j < array.length; j++) {
      if(array[i] === array[j]) {
        counter++;
      } 
      output[array[i]] = counter;
    }
  }
  
  return output;
}

console.log("This...", frequency([1,2,3,2,3]));













 