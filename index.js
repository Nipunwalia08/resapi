const express = require('express');
const bodyParser = require('body-parser');
const extractTextFromPDF = require('./pdf');
const responsecreate = require('./parse');
const resume =require("./aicontent")
const summary=require("./summary");
const jobdes = require('./jobdes');
const skill = require('./skill');

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

app.post('/extract', async (req, res) => {
  try {
    const data = req.body;
    const pdf_url = data.pdf_url;

    if (!pdf_url) {
      return res.status(400).json({ error: 'PDF URL is missing' });
    }

    const pdfText = await extractTextFromPDF(pdf_url);
    const openAIResponse = await responsecreate(pdfText);

    if (openAIResponse) {
      return res.status(200).json(openAIResponse);
    } else {
      return res.status(500).json({ error: 'Error processing data' });
    }
  } catch (error) {
    console.error('Error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
});


app.post('/return', async (req, res) => {
    try {
      const data = req.body;
      const des= data.description
      const title= data.title
      const details= data.details
      
  
      if (!data) {
        return res.status(400).json({ error: 'content missing' });
      }
  
      
      const openAIResponse = await resume(des,title,details);
  
      if (openAIResponse) {
        return res.status(200).json(openAIResponse);
      } else {
        return res.status(500).json({ error: 'Error processing data' });
      }
    } catch (error) {
      console.error('Error:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  });

  app.post('/summary', async (req, res) => {
    try {
      const data = req.body;
      const des= data.description
      const title= data.title
      const start_date= data.start_date
      const end_date=data.end_date
      const job_title= data.job_title
      const job_des=data.job_des
      
  
      if (!data) {
        return res.status(400).json({ error: 'content missing' });
      }
  
      
      const openAIResponse = await summary(des,title,start_date,end_date,job_title,job_des);
  
      if (openAIResponse) {
        return res.status(200).json(openAIResponse);
      } else {
        return res.status(500).json({ error: 'Error processing data' });
      }
    } catch (error) {
      console.error('Error:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  });

  app.post('/jobdes', async (req, res) => {
    try {
      const data = req.body;
      const des= data.description
      const title= data.title
      const details= data.details
      
  
      if (!data) {
        return res.status(400).json({ error: 'content missing' });
      }
  
      
      const openAIResponse = await jobdes(des,title,details);
  
      if (openAIResponse) {
        return res.status(200).json(openAIResponse);
      } else {
        return res.status(500).json({ error: 'Error processing data' });
      }
    } catch (error) {
      console.error('Error:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  });

  app.post('/skill', async (req, res) => {
    try {
      const data = req.body;
      const title= data.title
      const exp= data.exp
      
  
      if (!data) {
        return res.status(400).json({ error: 'content missing' });
      }
  
      
      const openAIResponse = await skill(title,exp);
  
      if (openAIResponse) {
        return res.status(200).json(openAIResponse);
      } else {
        return res.status(500).json({ error: 'Error processing data' });
      }
    } catch (error) {
      console.error('Error:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  });






app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
