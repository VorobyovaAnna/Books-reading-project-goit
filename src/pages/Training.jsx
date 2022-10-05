import MyTraining from 'components/MyTraining';
import MyGoal from 'components/MyGoal';
import Container from 'components/Container';
import ProgressChart from 'components/ProgressChart';
import Result from 'components/Results/Results';
// import BooksListEmptyMobile from 'components/MyTraining/BooksListEmptyMobile';
import { useMatchMedia } from 'hooks';
import { StyledAddButton } from 'components/MyTraining/MyTraining.styled';
import { ReactComponent as AddIcon } from 'images/svg/iconAdd.svg';
import { useState, useEffect } from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import { trainingsOperations } from 'redux/training';
// import { getTraining } from 'redux/training';
import { useGetTrainingQuery } from 'redux/RTKQuery/booksApi';

const Training = () => {
  const { isMobile } = useMatchMedia();
  const [isVisible, setIsVisible] = useState();
  const [isActiveTraining, setIsActiveTraining] = useState();
  const { data: trainings } = useGetTrainingQuery();

  useEffect(() => {
    trainings?.training.length === 0
      ? setIsActiveTraining(false)
      : setIsActiveTraining(true);
    console.log('записали тренінги');
  }, [trainings?.training.length]);
  // const handleClick = () => navigate('/training/add');

  // const dispatch = useDispatch();

  // useEffect(() => {
  //   dispatch(trainingsOperations.fetchTraining());
  // }, [dispatch]);

  // const training = useSelector(getTraining);

  // training ?? console.log(training);

  const toggleForm = () => {
    setIsVisible(!isVisible);
  };

  return (
    <>
      {isMobile && !isVisible && (
        <Container>
          <MyGoal />
          <MyTraining isFormVisible={isVisible} toggleForm={toggleForm} />
          <ProgressChart />
          <StyledAddButton type="button" onClick={toggleForm}>
            <AddIcon />
          </StyledAddButton>
        </Container>
      )}
      {isMobile && isVisible && (
        <Container>
          <MyTraining isFormVisible={isVisible} toggleForm={toggleForm} />
        </Container>
      )}
      {!isMobile && (
        <Container>
          {/* <MyGoal /> */}
          <MyTraining isFormVisible={isVisible} toggleForm={toggleForm} />
          {/* <ProgressChart /> */}
        </Container>
      )}
      {isActiveTraining && <Result />}
    </>
  );
};

export default Training;
