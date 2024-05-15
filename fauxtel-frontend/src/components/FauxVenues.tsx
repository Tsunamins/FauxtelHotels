import styled from 'styled-components';
import '../styles/FauxVenues.css';

export const FauxVenues = () => {
    return (
        <div>
            <PageHeader>Fauxtel Venues</PageHeader>
            <GeneralContentStyling>
                Coming Soon!!
            </GeneralContentStyling>
        </div>
    );
};

const PageHeader = styled.h1`
    font-size: 50px;
    color: teal;
`;

const GeneralContentStyling = styled.div`
    color: #87bba2;
`;
