import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const NFT_STORAGE_API_KEY = Deno.env.get('NFT_STORAGE_API_KEY');
    
    if (!NFT_STORAGE_API_KEY) {
      console.error('NFT_STORAGE_API_KEY not configured');
      return new Response(
        JSON.stringify({ error: 'NFT Storage API key not configured' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const formData = await req.formData();
    const file = formData.get('file') as File;
    
    if (!file) {
      return new Response(
        JSON.stringify({ error: 'No file provided' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    console.log('Uploading file to NFT.storage:', file.name, file.type, file.size);

    // Upload to NFT.storage
    const nftStorageResponse = await fetch('https://api.nft.storage/upload', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${NFT_STORAGE_API_KEY}`,
      },
      body: file,
    });

    if (!nftStorageResponse.ok) {
      const errorText = await nftStorageResponse.text();
      console.error('NFT.storage upload failed:', errorText);
      return new Response(
        JSON.stringify({ error: 'Failed to upload to NFT.storage', details: errorText }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const result = await nftStorageResponse.json();
    console.log('NFT.storage upload successful:', result);

    // Return the IPFS URL
    const ipfsUrl = `https://nftstorage.link/ipfs/${result.value.cid}`;
    
    return new Response(
      JSON.stringify({ 
        success: true, 
        cid: result.value.cid,
        url: ipfsUrl,
        gatewayUrl: `https://ipfs.io/ipfs/${result.value.cid}`
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error: unknown) {
    console.error('Error uploading to NFT.storage:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return new Response(
      JSON.stringify({ error: 'An unexpected error occurred', details: errorMessage }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
