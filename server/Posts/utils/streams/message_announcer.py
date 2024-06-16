# https://maxhalford.github.io/blog/flask-sse-no-deps/
from queue import Queue


class MessageAnnouncer:
    def __init__(self):
        self.listeners: list[Queue] = []

    def listen(self):
        q: Queue = Queue(maxsize=20)
        self.listeners.append(q)
        return q

    def announce(self, msg):
        for i in reversed(range(len(self.listeners))):
            try:
                self.listeners[i].put_nowait(msg)
            except Queue.full:
                del self.listeners[i]