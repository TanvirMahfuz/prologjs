database = {
        "environment" : {
            'papers': False,
            'manuals': False,
            'documents': False,
            'textbooks': False,
            'pictures': False,
            'illustrations': False,
            'photographs': False,
            'diagrams': False,
            'machines': False,
            'buildings': False,
            'tools': False,
            'numbers': False,
            'formulas': False,
            'computer programs': False
    },

    "job" : {
        'lecturing': False,
        'advising': False,
        'counselling': False,
        'building': False,
        'repairing': False,
        'troubleshooting': False,
        'writing': False,
        'typing': False,
        'drawing': False,
        'evaluating': False,
        'reasoning': False,
        'investigating': False
    },

    "stimulus_situation" : {
        'verbal': False,
        'visual': False,
        'physical object': False,
        'symbolic': False
    },

    "stimulus_response" : {
        'oral': False,
        'hands-on': False,
        'documented': False,
        'analytical': False
    },

    "feedback" :{
        'required': False,
        'not required': False
    },

    "medium" : {
            'workshop':False,
            'lecture-tutorial':False,
            'videocassette':False,
            'role-play exercises':False
    }

}

rules = {
    1: {
        'result': {
            "stimulus_situation": "verbal",
        },
        'dependencies': {
            'environment': ['papers', 'manuals', 'documents', 'textbooks']
        }
    },

    2: {
        'result': {
            "stimulus_situation": "visual",
        },
        'dependencies': {
            'environment': ['pictures', 'illustrations', 'photographs', 'diagrams']
        }
    },

    3: {
        'result': {
            "stimulus_situation": "physical object",
        },
        'dependencies': {
            'environment': ['machines', 'buildings', 'tools']
        }
    },

    4: {
        'result': {
            "stimulus_situation": "symbolic",
        },
        'dependencies': {
            'environment': ['numbers', 'formulas', 'computer programs']
        }
    },

    5: {
        'result': {
            "stimulus_response": "oral",
        },
        'dependencies': {
            'job': ['lecturing', 'advising', 'counselling']
        }
    },

    6: {
        'result': {
            "stimulus_response": "hands-on",
        },
        'dependencies': {
            'job': ['building', 'repairing', 'troubleshooting']
        }
    },

    7: {
        'result': {
            "stimulus_response": "documented",
        },
        'dependencies': {
            'job': ['writing', 'typing', 'drawing']
        }
    },

    8: {
        'result': {
            "stimulus_response": "analytical",
        },
        'dependencies': {
            'job': ['evaluating', 'reasoning', 'investigating']
            
        }
    },

    9: {
        'result': {
            "medium": "workshop",
        },
        'dependencies': {
            'stimulus_situation': ['physical object'],
            'stimulus_response': ['hands-on'],
            'feedback': ['required']
        }
    },

    10: {
        'result': {
            "medium": "lecture-tutorial",
        },
        'dependencies': {
            'stimulus_situation': ['symbolic'],
            'stimulus_response': ['analytical'],
            'feedback': ['required']
        }
    },

    11: {
        'result': {
            "medium": "videocassette",
        },
        'dependencies': {
            'stimulus_situation': ['visual'],
            'stimulus_response': ['documented'],
            'feedback': ['not required']
        }
    },

    12: {
        'result': {
            "medium": "lecture-tutorial",
        },
        'dependencies': {
            'stimulus_situation': ['verbal'],
            'stimulus_response': ['oral'],
            'feedback': ['required']
        }
    },

    13: {
        'result': {
            "medium": "lecture-tutorial",
        },
        'dependencies': {
            'stimulus_situation': ['verbal'],
            'stimulus_response': ['analytical'],
            'feedback': ['required']
        }
    },

    14: {
        'result': {
            "medium": "role-play exercises",
        },
        'dependencies': {
            'stimulus_situation': ['verbal'],
            'stimulus_response': ['oral'],
            'feedback': ['required']
        }
    }
}

def forwardChaining(threshold=0.75):
    # This loop continues until no new updates are made in an iteration.
    updates_made = True
    while updates_made:
        updates_made = False  # Assume no updates are made initially

        # Iterate over each rule
        for rule_id, rule_data in rules.items():
            total_dependencies = len(rule_data['dependencies'])
            matching_dependencies = 0

            # Check if all dependencies are met for the current rule
            for dep_type, required_values in rule_data['dependencies'].items():
                if dep_type not in database:
                    continue  # Ignore non-existing dependency types

                # Count how many required dependencies are met
                if all(database[dep_type].get(value, False) for value in required_values):
                    matching_dependencies += 1

            # Calculate the score as a percentage of matching dependencies
            score = matching_dependencies / total_dependencies if total_dependencies > 0 else 0

            # If the score meets or exceeds the threshold, set the result value(s) in the database
            if score >= threshold:
                # Extract the result key and value from the rule result
                result_key, result_value = next(iter(rule_data['result'].items()))

                # If the result value isn't already True, set it to True and note an update was made
                if not database[result_key].get(result_value, False):
                    database[result_key][result_value] = True
                    updates_made = True

def backwardChaining():
    updates_made = True
    while updates_made:
        updates_made = False  # Assume no updates are made initially

        # Check all rules in reverse for their results
        for rule_id, rule_data in rules.items():
            # Extract the result key and value from the rule result
            result_key, result_value = next(iter(rule_data['result'].items()))

            # Only consider rules where the result is True in the database
            if database[result_key].get(result_value, False):
                dependencies_met = True

                # Check all dependencies for this rule
                for dep_type, required_values in rule_data['dependencies'].items():
                    if dep_type not in database:
                        dependencies_met = False
                        break

                    # Check if each required dependency is met
                    if not all(database[dep_type].get(value, False) for value in required_values):
                        dependencies_met = False
                        break

                # If dependencies are not met, try to set them based on the rules
                if not dependencies_met:
                    for dep_type, required_values in rule_data['dependencies'].items():
                        if dep_type not in database:
                            continue  # Skip non-existing dependency types

                        # Check if setting any of the required values can help
                        for value in required_values:
                            if not database[dep_type].get(value, False):
                                database[dep_type][value] = True
                                updates_made = True  # Mark that an update was made



obj =   {
            'stimulus_situation': 'verbal',
            'stimulus_response': 'oral',
            'feedback': 'required',
        }


for key, value in obj.items(): 
    database[key][value] = True

forwardChaining()


for key, value in database['medium'].items():
    if value:
      print(key)

backwardChaining()

for key, value in database['medium'].items():
    if value:
      print(key)