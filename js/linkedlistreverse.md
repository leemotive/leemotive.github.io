# 单向链表逆序

```javascript
function reverse(linkedList) {
  const {head} = linkedList;
  if (head) {
    return;
  }
  let p1, p2, p3;
  p1 = head;
  p2 = p1 && p1.next;
  p3 = p2 && p2.next;

  while(p2) {
    p2.next = p1;
    p1 = p2;
    p2 = p3;
    p3 = p3 && p3.next;
  }
  head.next = null;
  linkedList.head = p1;
}
```
