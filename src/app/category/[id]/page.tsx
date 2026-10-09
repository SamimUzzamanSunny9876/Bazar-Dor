

const categoriespage = async ({ params }) => {
  const { id } = await params;
  console.log(id);

  const res = await fetch(
    `https://api.abcz.workers.dev/api/bazardor/products?category=${id}`,
  );

  const data = await res.json();

  console.log(data);

  return <div>
     <div>
        {data.categoryIcon}
        {data.nameBn}</div>
    
     <div>{data.length}টি পণ্যের আজকের দাম ও পরিবর্তন</div>


  </div>;
};

export default categoriespage;
