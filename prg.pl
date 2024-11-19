
delicious(cakes).

delicious(pickles).

delicious(biryani).

spicy(pickles).

relishes(priya, coffee).


likes(priya, Food) :-
    delicious(Food).



likes(prakash, Food) :-
    spicy(Food), delicious(Food).

