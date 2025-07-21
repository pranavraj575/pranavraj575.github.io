import numpy as np


class Toe:
    def __init__(self, board: np.ndarray = None, player=None):
        """
        :param board: 3x3 np array
        :param player: 0 or 1 depending on if it is player
        """
        if board is None:
            board = np.zeros((3, 3))
        self.board = board
        if player is None:
            # player 0 goes if the board is even or has lots of -1s, player 1 goes otherwise
            player = int(np.sum(board) > 0)
        self.player = player

    def move(self, square):
        board = self.board.copy()
        board[square] = 1 - 2*self.player
        return Toe(board=board, player=1 - self.player)

    def valid_moves(self):
        return tuple(zip(*np.where(self.board == 0)))

    def outcome(self):
        for arr in ([r for r in self.board] +
                    [self.board[:, j] for j in range(len(self.board[0]))] +
                    [self.board[range(3), range(3)]] +
                    [self.board[[len(self.board) - i - 1 for i in range(3)], range(3)]]):
            if np.all(arr == 1):
                return 1
            if np.all(arr == -1):
                return -1
        if np.all(self.board != 0):
            return 0
        return None

    def __str__(self):
        return '\n'.join([''.join(['O_X'[int(k) + 1] for k in row]) for row in self.board])


if __name__ == '__main__':
    def minmax(toe: Toe):
        best_val = None
        best = None
        for move in toe.valid_moves():
            child = toe.move(move)

            value = child.outcome()
            if value is None:
                _, value = minmax(child)
            if best_val is None:
                best_val = value
                best = [move]
            else:
                sign = 1 - 2*toe.player
                if sign*best_val < sign*value:  # this one is better, swap
                    best_val = value
                    best = [move]
                elif sign*best_val == sign*value:  # tie, append move
                    best.append(move)

        return best, best_val

    def all_boards_from(toe:Toe=None,track=None):
        if track is None:
            track=set()
        if toe is None:
            toe=Toe()
        if toe.__str__() in track:
            return track
        track.add(toe.__str__())
        if toe.outcome() is None:
            for move in toe.valid_moves():
                child=toe.move(move)
                track=track.union(all_boards_from(child,track))
        return track
    for item in (all_boards_from(Toe(np.array([[1,-1,0,],
                                  [-1,1,0,],
                                  [1,-1,0,],])))):
        print(item)
        print()
    print(len(all_boards_from()))
    toe = Toe()
    while toe.outcome() is None:
        print()
        print(toe)
        print(minmax(toe))
        valid_moves = toe.valid_moves()
        move = valid_moves[np.random.randint(len(valid_moves))]
        toe = toe.move(move)
    print()
    print(toe)
    print(toe.outcome())
