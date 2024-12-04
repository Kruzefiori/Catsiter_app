        <VisitsContainer>
          {[...visits]
            .sort((a, b) => new Date(a.visitDate).getTime() - new Date(b.visitDate).getTime())
            .map((visit, index) => (
              <VisitWrapper key={visit.visitDate?.toISOString() ?? index}>
                <VisitSummary expandIcon={<ArrowDropDownIcon />}>{`${index + 1}ª visita: ${
                  visit.visitDate?.toLocaleDateString('pt-BR', longMonthDateOptions) ?? '(Clique para editar)'
                }`}</VisitSummary>
                <VisitItem>
                  <Label>
                    Visit Date:
                    <input
                      type="datetime-local"
                      value={visit.visitDate?.toISOString().split('.')[0] ?? ''}
                      onChange={(e) => handleUpdateVisit(index, 'visitDate', e.target.value)}
                    />
                  </Label>
                  <Label>
                    Notes:
                    <textarea
                      minLength={1}
                      maxLength={2000}
                      value={visit.notes}
                      onChange={(e) => handleUpdateVisit(index, 'notes', e.target.value)}
                    />
                  </Label>
                  <Button variant="ghost" fullWidth onClick={() => handleRemoveVisit(index)}>
                    <Delete />
                    Remover Visita
                  </Button>
                </VisitItem>
              </VisitWrapper>
            ))}
