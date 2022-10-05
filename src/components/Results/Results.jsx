import { Section, Title } from './Results.styled';
import FormResult from './FormResult/index';
import ListResults from './ListResults/ListResults';
import useResult from './useResult';

const Results = () => {
  const { onSubmit, results } = useResult();
  return (
    <Section>
      <Title>Результати</Title>
      <FormResult onSubmit={onSubmit} />
      {results && results?.length !== 0 && <ListResults results={results} />}
      {results?.length === 0 && <p>Додайте свої перші результати!</p>}
    </Section>
  );
};

export default Results;
