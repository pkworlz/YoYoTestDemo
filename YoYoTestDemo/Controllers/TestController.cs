using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using YoYoTestDemo.Models;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace YoYoTestDemo.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TestController : ControllerBase
    {
        // GET: api/<TestController>
        [HttpGet]
        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        }

        [HttpGet("FitnessRating")]
        public ActionResult GetFitnessRating()
        {
            var fitnessRatingData = new List<FitnessRating>();
            var folderDetails = Path.Combine(Directory.GetCurrentDirectory(), $"wwwroot\\{"json\\fitnessrating_beeptest.json"}");
            var jsonText = System.IO.File.ReadAllText(folderDetails);

            JArray jsonArray = JArray.Parse(jsonText);
            JObject json = JObject.Parse(jsonArray[0].ToString());
            foreach (var item in jsonArray)
            {
                var jsonObj = JsonConvert.DeserializeObject<FitnessRating>(item.ToString());
                fitnessRatingData.Add(jsonObj);
            }

            return Ok(fitnessRatingData);
        }

        //private ActionResult Json(object p)
        //{
        //    throw new NotImplementedException();
        //}

        // GET api/<TestController>/5
        [HttpGet("{id}")]
        public string Get(int id)
        {
            return "value";
        }

        // POST api/<TestController>
        [HttpPost]
        public void Post([FromBody] string value)
        {
        }

        // PUT api/<TestController>/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE api/<TestController>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
