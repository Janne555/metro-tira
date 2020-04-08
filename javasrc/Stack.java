package javasrc;

import java.util.Iterator;
import java.util.LinkedList;

public class Stack {
  private LinkedList<String> list;

  public Stack() {
    this.list = new LinkedList<>();
  }

  public void push(String data) {
    this.list.addFirst(data);
  }

  public String pop() {
    return this.list.removeFirst();
  }

  public void print() {
    Iterator<String> it = this.list.iterator();
    while (it.hasNext()) {
      System.out.println(it.next());
    }
  }
}