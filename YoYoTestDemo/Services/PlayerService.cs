using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using YoYoTestDemo.Models;

namespace YoYoTestDemo.Services
{
    public class PlayerService : IPlayerService
    {
        private List<Player> players = new List<Player>();

        public Player EditPlayer(Player player)
        {
            int editIndex = players.FindIndex(o => o.id == player.id);
            players[editIndex] = player;
            return players[editIndex];
        }

        public List<Player> GetPlayers()
        {

            var player1 = new Player
            {
                id = 1,
                name = "Prem Kumar",
                warn = false,
                stop = false,
                levelNumber = 0,
                shuttleNumber = 0
            };

            var player2 = new Player
            {
                id = 2,
                name = "Jhon Cina",
                warn = false,
                stop = false,
                levelNumber = 0,
                shuttleNumber = 0
            };

            var player3 = new Player
            {
                id = 3,
                name = "Roney Colmen",
                warn = false,
                stop = false,
                levelNumber = 0,
                shuttleNumber = 0
            };

            var player4 = new Player
            {
                id = 4,
                name = "Arnold schwarzenegger",
                warn = false,
                stop = false,
                levelNumber = 0,
                shuttleNumber = 0
            };

            var player5 = new Player
            {
                id = 5,
                name = "Jay Cutler",
                warn = false,
                stop = false,
                levelNumber = 0,
                shuttleNumber = 0
            };

            players.Add(player1);
            players.Add(player2);
            players.Add(player3);
            players.Add(player4);
            players.Add(player5);

            return players;
        }
    }

    public interface IPlayerService
    {
        List<Player> GetPlayers();
        Player EditPlayer(Player player);
    }
}
