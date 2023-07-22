export default function ComicListItem({results}) {
  return (<div>
    <img src={results.thumbnail.path+"."+results.thumbnail.extension}/>
    <h3>{results.title}</h3>
    <p>{results.description}</p>
  </div>);
}
