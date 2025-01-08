SELECT AVG(`vote`) as `avg_vote`, `movies`.`id`
FROM `movies`
JOIN `reviews`
ON `movies`.`id` = `reviews`.`movie_id`
GROUP BY `movies`.`id`;