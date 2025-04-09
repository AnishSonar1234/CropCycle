import express from 'express';

const requestRoutes = (supabase) => {
  const router = express.Router();

  // Get all requests
  router.get('/', async (req, res) => {
    try {
      const { data, error } = await supabase
        .from('requests')
        .select(`
          *,
          farmers (
            id,
            user_name,
            user_email,
            user_contact,
            user_description
          )
        `);
      
      if (error) throw error;
      res.json(data);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  // Get request by ID
  router.get('/:id', async (req, res) => {
    try {
      const { data, error } = await supabase
        .from('requests')
        .select(`
          *,
          farmers (
            id,
            user_name,
            user_email,
            user_contact,
            user_description
          )
        `)
        .eq('id', req.params.id)
        .single();
      
      if (error) throw error;
      res.json(data);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  // Create new request
  router.post('/', async (req, res) => {
    try {
      const { data, error } = await supabase
        .from('requests')
        .insert([req.body]);
      
      if (error) throw error;
      res.status(201).json(data);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  // Update request
  router.put('/:id', async (req, res) => {
    try {
      const { data, error } = await supabase
        .from('requests')
        .update(req.body)
        .eq('id', req.params.id);
      
      if (error) throw error;
      res.json(data);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  // Delete request
  router.delete('/:id', async (req, res) => {
    try {
      const { data, error } = await supabase
        .from('requests')
        .delete()
        .eq('id', req.params.id);
      
      if (error) throw error;
      res.json(data);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  return router;
};

export default requestRoutes; 