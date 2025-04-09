import express from 'express';

const farmerRoutes = (supabase) => {
  const router = express.Router();

  // Get all farmers
  router.get('/', async (req, res) => {
    try {
      const { data, error } = await supabase
        .from('farmers')
        .select('*');
      
      if (error) throw error;
      res.json(data);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  // Get farmer by ID
  router.get('/:id', async (req, res) => {
    try {
      const { data, error } = await supabase
        .from('farmers')
        .select('*')
        .eq('id', req.params.id)
        .single();
      
      if (error) throw error;
      res.json(data);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  // Create new farmer
  router.post('/', async (req, res) => {
    try {
      const { data, error } = await supabase
        .from('farmers')
        .insert([req.body]);
      
      if (error) throw error;
      res.status(201).json(data);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  // Update farmer
  router.put('/:id', async (req, res) => {
    try {
      const { data, error } = await supabase
        .from('farmers')
        .update(req.body)
        .eq('id', req.params.id);
      
      if (error) throw error;
      res.json(data);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  // Delete farmer
  router.delete('/:id', async (req, res) => {
    try {
      const { data, error } = await supabase
        .from('farmers')
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

export default farmerRoutes; 